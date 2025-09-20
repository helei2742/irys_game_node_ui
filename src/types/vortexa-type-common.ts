import {API_DEFAULT_PAGE, API_DEFAULT_PAGE_SIZE} from "@/config/vortexa-config.ts";

/**
 * 上传实体
 */
export class UploadEntry {
  rawLines: Array<Map<string, object>>

  constructor(rawLines: Array<Map<string, object>>) {
    this.rawLines = rawLines
  }
}

/**
 * 更新
 */
export class UpdateEntry {
  update: Array<Record<string, never>>
  delete: Array<never>
}

/**
 * Http 响应实体
 */
export class Result<T> {
  success: boolean
  errorMsg: string
  data: T

  constructor({success, errorMsg, data}: { success: boolean, errorMsg: string, data: T }) {
    this.success = success
    this.errorMsg = errorMsg
    this.data = data
  }
}

export interface Pair<K, V> {
  key: K
  value: V
}

export class PageQuery {
  vagueStr: string
  orderBy: string
  desc: boolean
  page: number = API_DEFAULT_PAGE
  limit: number = API_DEFAULT_PAGE_SIZE
  filterMap?: Record<string, object>

  constructor({page, limit, filterMap}: {
    page?: number,
    limit?: number,
    filterMap?: Record<string, object>
  }) {
    this.page = page == undefined ? API_DEFAULT_PAGE : page
    this.limit = limit == undefined ? API_DEFAULT_PAGE_SIZE : limit
    this.filterMap = filterMap
  }
}

/**
 * 分页响应实体
 */
export class PageResult<T> {
  total: number;
  list: Array<T>;
  pages: number;
  pageNum: number;
  pageSize: number;

  constructor({total, pages, pageNum, pageSize, list}: {
    total: number,
    pages: number,
    pageNum: number,
    pageSize: number,
    list: Array<T>
  }) {
    this.total = total
    this.pages = pages
    this.pageNum = pageNum
    this.pageSize = pageSize
    this.list = list
  }
}


export interface BotInstanceConfig {
  baseUrl: string
  botContentPath: string
  botKey: string
  botVersion: string
  botName: string
}


export interface TypeCount {
  type: string
  cnt: number
}
