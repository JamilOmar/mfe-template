import { SetMetadata } from '@nestjs/common';
import { metadataScope } from '../common/shared/constants';
import { MetadataPermission } from '../common/shared/types';

export const Auth = (...permissions: MetadataPermission[]) =>
  SetMetadata(metadataScope, permissions[0]);
