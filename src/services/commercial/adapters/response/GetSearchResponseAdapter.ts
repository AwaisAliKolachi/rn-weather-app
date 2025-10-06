// GetSearchResponseAdapter

import { SearchResult } from '@src/services/models';
import { SearchResponseDTO } from '../../dtos';

export class GetSearchResponseAdapter {
  service(dto: SearchResponseDTO[]): SearchResult[] {
    return dto.map(item => item as SearchResult);
  }
}
