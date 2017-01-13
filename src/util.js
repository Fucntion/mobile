var util = {
    isLoading:{
        show: false,
        text:null
    },
    getLoading: function () {
        return this.isLoading
    },
    openLoading: function (text) {
        this.isLoading.show = true,
        this.isLoading.text = text || 'loading'
        console.log(this.isLoading)

    },
    closeLoading: function () {
        this.isLoading.show = false
    },
    //房间信息，用来记录房间相关信息。。比如是否加载完成等等
    room:{
        load:false,
        name:null
    },
    getRoom:function(){
        return this.room
    },
    setRoom:function(name,load){

        //修改或者维持原状
        if(name){
            this.room.name = name
        }
        if(load){
            this.room.load = load
        }
        
        
    },
    //导航菜单
    menu:{
        currentView:'communit'
        
        //初始化是聊天室
    },
    setCurrentView:function(text){
        if(text){
            this.menu.currentView = text 
        }

    },
    getMenu:function(){
        return this.menu
    }
}

export default  util