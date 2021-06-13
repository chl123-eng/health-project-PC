<template>
	<div class="main">
		<div class="main_down">
			<div class="left">
				<ul class="patients">
          <li v-for="(item,index) in patientList" :key="index" :class="{ activeTag : toUserId === item.userId }" @click="startSession(item.userId)">{{ item.userName}}</li>
        </ul>
			</div>
			<div class="right">
				<div class="up" ref="element" id="msg_end">
					<div v-for="(item,i) in list" :key="i" :class="item.toId === curUserId ? 'msg_left' : 'msg_right'">
						<div :class="item.toId === curUserId ? 'messageLeft' : 'messageRight'">{{item.message}}</div>
					</div>

				</div>
				<div class="down">
					<el-input
					type="textarea"
					:rows="9"
					placeholder="请输入内容，回车发送！"
					@keyup.enter.native = "sendMsg"
					v-model="message">
					</el-input>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { getMyBindingPatientInfoList } from '@/api/table'
import { getMessageList } from '@/api/askingRoom'
import axios from 'axios';
import { param2Obj } from '../../utils';
export default {

	name: 'HelloWorld',
	data(){
		return{
      patientList: [],
			message: "",
      list: [],
			curUserId: "",
			curUserName: "",
      toUserId: '',
      allMsgList: []
		}
  },
  updated(){
		// 解决每次发消息到最后面
		var elmnt = document.getElementById("msg_end");
		elmnt.scrollTop = elmnt.scrollHeight;
  },
  mounted(){
    this.getUserId()
    this.getPatientList()
    this.getMessageList()
  },
  methods: {
    //获取用户id
    getUserId(){
      this.curUserId = JSON.parse(sessionStorage.getItem('doctorInfo')).doctorId
      this.curUserName = JSON.parse(sessionStorage.getItem('doctorInfo')).doctorName
      this.initWebSocket(this.curUserId)
    },
    //获取绑定患者列表
    getPatientList() {
      getMyBindingPatientInfoList().then(res => {
        if(res.code == 500){
          this.$message({
            message: res.msg
          })
        }
        this.patientList = res.data
      })
    },
    initWebSocket: function (userId) {
			// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
			this.websock = new WebSocket("ws://1.15.86.59:8082/socket/"+userId);
			this.websock.onopen = this.websocketonopen;
			this.websock.onerror = this.websocketonerror;
			this.websock.onmessage = this.websocketonmessage;
			this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
			console.log("WebSocket连接成功");
		},
		websocketonerror: function (e) {
			console.log("WebSocket连接发生错误",e);
		},
		websocketonmessage: function (e) {
      let data = JSON.parse(e.data);
      if(data.fromId == this.toUserId){
        this.list.push(data)
      }
		},
		websocketclose: function (e) {
			if(this.curUserId != null){
        this.initWebSocket(this.curUserId, 99999999)
			}
			console.log(e);
    },
    // 消息发送
		sendMsg(){
			let data = {
				system: '',
        fromName: this.curUserName,
        fromId: this.curUserId,
        toName: '',
        message: this.message,
        toId: this.toUserId
      }
      this.list.push(data)

			this.websock.send(JSON.stringify(data))
      this.message = ''
    },
    // 开始会话
		startSession(toUserId){
      this.toUserId = toUserId
      this.list = []
      this.getMessageList()
      console.log(this.allMsgList);

      for(let i = 0; i < this.allMsgList.length; i++){
        if(this.allMsgList[i].fromId == this.curUserId && this.allMsgList[i].toId == this.toUserId){
          this.list.push(this.allMsgList[i])
        }else if (this.allMsgList[i].fromId == this.toUserId && this.allMsgList[i].toId == this.curUserId){
          this.list.push(this.allMsgList[i])
        }
      }
    },
    //获取历史消息
    getMessageList(){
      getMessageList().then(response => {
        this.allMsgList = response.data
      })
    },
  }
}
</script>

<style lang="scss" scoped>
	.main{
	  min-height: calc(100vh - 80px);
    width: 100%;
    overflow: hidden;
    margin-top: 15px;
	}
	.main_down{
		min-height: calc(100vh - 80px);
    width: 100%;
		border: 1px #1890ff solid;
		display: flex;
		justify-self: space-between;
	}
	.left{
		width: 300px;
		min-height: calc(100vh - 80px);
		border-right: 1px #1890ff solid;
	}
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    line-height: 50px;
    border-bottom: 1px solid #999;
    font-size: 20px;
    text-align: center;
  }
  .activeTag {
    background-color: rgb(132, 190, 236);
    cursor: pointer;
    color: #fff;
  }
  li:hover {
    cursor: pointer;
  }
	.right{
		width: calc(100vw - 300px);
		min-height: calc(100vh - 80px);
		/* border-right: 1px #1890ff solid; */
	}
	.box{
		width: 350px;
		height: 32px;
		padding: 10px 25px 10px 25px;
		display: flex;
		justify-self: flex-end;
		/* border: 1px red solid; */
	}
	.box:hover{
		background-color: gainsboro;
		cursor: pointer;
	}
	.box_select{
		width: 350px;
		height: 32px;
		padding: 10px 25px 10px 25px;
		display: flex;
		justify-self: flex-end;
		background-color: gainsboro;
	}
	.box_left{
		width: 300px;
		height: 32px;
	}
	.right_left{
		width: 50px;
		height: 32px;
		display: flex;
		justify-content: space-between;
		/* border: 1px red solid; */
	}
	.right_left_count{
		/* border: 1px blue solid; */
		padding-left: 10px;
		width: 20px;
	}
	.right_left_del{
		width: 20px;
		padding-left: 10px;
	}
	.up{
		height: calc(100vh - 280px);
		overflow-y: scroll;
		overflow-x: hidden;
		/* padding-bottom: 40px; */
		border-bottom: 1px #1890ff solid;
    padding-top: 20px;
	}
	.msg_left{
		width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
	}
	.msg_right{
		width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
		text-align: right;
	}
  .messageLeft{
    width: fit-content;
    padding-top: 12px;
    border-radius: 5px;
    background-color: #eee;
    margin-left: 10px;
    padding: 10px;
    padding-top: 12px;
  }
  .messageRight{
    width: fit-content;
    border-radius: 5px;
    background-color: #34bc71;
    margin-right: 10px;
    padding: 10px;
    padding-top: 12px;
  }
</style>
