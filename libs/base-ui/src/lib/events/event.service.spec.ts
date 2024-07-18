import { EventService } from './event.service';

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(() => {
    eventService = new EventService();
  });

  it('should create new subscription holder', () => {
    let result;
    const sub = eventService.get('test').subscribe((x) => (result = x));
    expect(sub).toBeDefined();
    expect(result).toBeFalsy();
  });

  it('should subscribe to existing to an existing subscription holder', () => {
    eventService.get('test').next('value');
    let result: string;
    const sub = eventService.get('test').subscribe((x: string) => {
      result = x;
      expect(result).toEqual('value');
    });
    expect(sub).toBeDefined();
  });
});
