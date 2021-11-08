import {Launch} from "~/dto";

export interface DataSource {
  getLaunches(): Promise<Launch[]>;
}
