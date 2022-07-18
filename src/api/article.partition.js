//文章分区API
import { post_form, post_json, delete_id } from './_service'

function QUERY_BY_PAGE (data = {}) {
  return post_json('/partition/page', data)
}

function ADD (data = {}) {
  return post_json('/partition/add', data)
}

function REMOVE (data = {}) {
  return delete_id('/partition/' + data)
}

function BATCH_REMOVES (data = {}) {
  return delete_id('/partition/removes', data)
}

function QUERY_TYPE_BY_PAGE (data = {}) {
  return post_json('/partitionType/page', data)
}

export default {
  QUERY_BY_PAGE,
  ADD,
  REMOVE,
  BATCH_REMOVES,
  QUERY_TYPE_BY_PAGE
}
