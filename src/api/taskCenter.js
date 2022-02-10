import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';
/**
 * 任务中心——列表接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userId        用户id
 *  offsetNum     偏移量
 *  limitNum      获取的数据量
 */
export function getTaskList(data) {
    return fetch({
        url:API.taskCenterHost+'taskcenter/task',
        method: 'get',
        params: data
    })
}
/**
 * 任务中心——取消/重新开始任务
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  taskId        任务id
 *  taskType      任务类型
 *  taskState     4 取消 | 6 重新开始
 */
export function modifyTask(data) {
    return fetch({
        url:API.taskCenterHost+'taskcenter/modifyTask',
        method: 'post',
        data: data
    })
}
/**
 * 任务中心——删除任务
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  taskId        任务id ''  清空所有   有值  删除一条
 *  userId        用户id 必传
 */
export function deleteTask(data) {
    return fetch({
        url:API.taskCenterHost+'taskcenter/deleteTask',
        method: 'get',
        params: data
    })
}
/**
 * 任务中心——获取当前的任务数和未读数
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userId        用户id 必传
 */
export function taskNum(data) {
    return fetch({
        url:API.taskCenterHost+'taskcenter/taskNum',
        method: 'get',
        params: data
    })
}
/**
 * 任务中心——刷新当前任务列表
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  taskId        任务id
 */
export function taskSchedule(data) {
    return fetch({
        url:API.taskCenterHost+'taskcenter/taskSchedule',
        method: 'get',
        params: data
    })
}