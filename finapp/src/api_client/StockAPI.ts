import axios from 'axios';
import { Settings } from '../Settings';


class StockAPI {

  private host: string;
  private port: number;
  private baseAPI;

  constructor(host?: string, port?: number) {
    this.host = host ? host : Settings.BACKEND_APISERVER_HOST;
    this.port = port ? port : Settings.BACKEND_APISERVER_PORT;
    this.baseAPI = axios.create({
      baseURL: `http://${this.host}:${this.port}/stock`
    });
  }

  async getCompanyList() {
    return this.baseAPI.get('company')
  }

  async getSectorList() {
    return this.baseAPI.get('sector')
  }

  async getStockprice(code: number, year?: number, month?: number, day?: number) {
    const params: any = {}
    if (year) {
      params['year'] = year
    }
    if (month) {
      params['month'] = month
    }
    if (day) {
      params['day'] = day
    }
    return this.baseAPI.get(`stockprice/${code}`, {params: params})
  }
}

export default StockAPI;
