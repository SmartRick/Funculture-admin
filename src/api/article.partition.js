//文章分区API
import { post_form, post_json } from './_service'

export function QUERY_BY_PAGE (data = {}) {
  return post_json('/partition/page', data)
}

export function QUERY_TYPE_BY_PAGE (data = {}) {
  return post_json('/partitionType/page', data)
}
