import {DataSource} from "~/services/dataSource/DataSource";
import {Launch} from "~/dto";

const baseUrl = 'https://api.spacexdata.com/v3';

export class RemoteDataSource implements DataSource {
  async getLaunches(): Promise<Launch[]> {
    return fetch(`${baseUrl}/launches`).then(r => r.json()).then(r => r as Launch[]);
  }
}
