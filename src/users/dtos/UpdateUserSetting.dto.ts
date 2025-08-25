import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSettingDto {
  @IsOptional()
  @IsBoolean()
  notificationOn?: boolean;

  @IsOptional()
  @IsBoolean()
  smsEnables?: boolean;
}
 