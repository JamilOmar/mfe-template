import { Component, Injector } from '@angular/core';
import {
  ComponentFixtureAutoDetect,
  getTestBed,
  TestBed,
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { loadRemoteModule } from '@nx/angular/mf';
import { DynamicAppLoaderService } from './dynamic-app-loader.service';
import { MFEConfiguration } from '../types';

jest.mock('@nrwl/angular/mf', () => {
  const original = jest.requireActual('@nrwl/angular/mf');
  const mockedValue = new Promise((resolve, reject) => {
    resolve({ RemoteEntryModule: null });
  });
  return {
    ...original,
    loadRemoteModule: jest.fn().mockReturnValue(mockedValue),
  };
});

class MockRouter {
  public config: Array<object> = [];
  resetConfig(configuration: object) {
    return;
  }
}

@Component({
  template: '',
})
class TestComponent {}

describe('DynamicAppLoaderService', () => {
  let injector: Injector;
  let router: Router;
  let dynamicAppLoaderService: DynamicAppLoaderService;
  const initialRouteConfig: Routes = [
    { path: '', component: TestComponent },
    { path: 'mockUrl', component: TestComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(initialRouteConfig)],
    });
    dynamicAppLoaderService = TestBed.inject(DynamicAppLoaderService);
    injector = getTestBed();
    router = injector.get(Router);
  });

  it('should be created', () => {
    expect(dynamicAppLoaderService).toBeTruthy();
  });

  describe('loadModuleList', () => {
    const mockedRemoteModules: MFEConfiguration[] = [
      {
        code: 'mockedId1',
        name: 'remoteApplication1',
        description: 'This is the test description',
        route: 'mockedRoute1',
        module: 'mockedModule1',
        url: 'mockedUrl1',
        configuration: {
          apiUrl: 'mockedAttribValue1',
        },
        label: 'mockedlabel1',
        moduleClass: 'mockedModuleClass1',
      },
      {
        code: 'mockedId2',
        name: 'remoteApplication2',
        description: 'This is the test description',
        route: 'mockedRoute2',
        module: 'mockedModule2',
        url: 'mockedUrl2',
        configuration: {
          apiUrl: 'mockedAttribValue2',
        },
        label: 'mockedlabel2',
        moduleClass: 'mockedModuleClass2',
      },
      {
        code: 'mockedId3',
        name: 'remoteApplication3',
        description: 'This is the test description',
        route: 'mockedRoute3',
        module: 'mockedModule3',
        url: 'mockedUrl3',
        configuration: {
          apiUrl: 'mockedAttribValue3',
        },
        label: 'mockedlabel3',
        moduleClass: 'mockedModuleClass3',
      },
    ];

    it('should call the loadModule method', () => {
      const loadModuleSpy = jest.spyOn(dynamicAppLoaderService, 'loadModule');
      dynamicAppLoaderService.loadModuleList(mockedRemoteModules);
      mockedRemoteModules.map((record) => {
        expect(loadModuleSpy).toHaveBeenCalledWith(record);
      });
    });
  });

  describe('loadModule', () => {
    const mockRemoteModule: MFEConfiguration = {
      code: 'mockId',
      name: 'mockModuleName',
      description: 'This is the test description',
      route: 'mockRoute',
      module: 'mockModule',
      url: 'mockUrl',
      configuration: {},
      label: 'mockLabel',
      moduleClass: 'mockedModuleClass',
    };

    it('should call the loadRemoteModule from the module federation library', async () => {
      expect(router.config).toEqual(initialRouteConfig);
      dynamicAppLoaderService.loadModule(mockRemoteModule);
      expect(router.url).toBe('/');

      await router.navigate([mockRemoteModule.url]);
      expect(router.url).toBe(`/${mockRemoteModule.url}`);
      expect(router.config.length).toBe(3);
    });

    it("should call reset the main app's routing configuration adding the remote module's routing", async () => {
      const resetConfigSpy = jest
        .spyOn(router, 'resetConfig')
        .mockReturnValue();
      await dynamicAppLoaderService.loadModule(mockRemoteModule);

      expect(resetConfigSpy).toHaveBeenCalled();
      resetConfigSpy.mockRestore();
    });
  });
});
