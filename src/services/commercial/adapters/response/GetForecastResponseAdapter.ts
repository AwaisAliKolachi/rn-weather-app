import { ForecastResult } from '@src/services/models';
import { ForecastResponseDTO } from '../../dtos';

export class GetForecastResponseAdapter {
  constructor() {}

  service(dto: ForecastResponseDTO): ForecastResult {
    return dto as ForecastResult;
  }
}
