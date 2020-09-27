class Utils extends Desk{
    constructor() {
        super()
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    static drawRect(color: number, arr: Array<number>): egret.Shape {
        const shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(arr[0], arr[1], arr[2], arr[3]);
        shape.graphics.endFill();
        return shape;
    }

    static drawRoundRect(color: number, arr: Array<number>): egret.Shape {
        const shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRoundRect(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
        shape.graphics.endFill();
        return shape;
    }
    //提示文本
    static toast(text: string, container: egret.DisplayObjectContainer) {
        const wrapper: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        const shp: egret.Shape = new egret.Shape();
        const panel: egret.TextField = new egret.TextField();
        panel.text = text;
        // panel.textAlign = egret.HorizontalAlign.CENTER;
        // panel.verticalAlign = egret.VerticalAlign.MIDDLE;
        const paddingLeft = 10;
        const paddingUp = 20;
        wrapper.width = panel.width + paddingLeft * 2;
        wrapper.height = panel.height + paddingUp * 2;
        // 居中
        panel.x = paddingLeft;
        panel.y = paddingUp;
        shp.graphics.beginFill(0x00000);
        shp.graphics.drawRoundRect(0, 0, wrapper.width, wrapper.height, 20, 20);
        shp.graphics.endFill();
        wrapper.addChild(shp);
        wrapper.addChild(panel);
        wrapper.x = container.width / 2 - wrapper.width / 2;
        wrapper.y = container.height / 2 - wrapper.height / 2;
        wrapper.zIndex = 1000;
        container.addChild(wrapper);
        egret.setTimeout(() => {
            container.removeChild(wrapper);
        }, container, 1000);
    }
    //计时器
    static drawtime(text:boolean,container: egret.DisplayObjectContainer){
        const wrapper: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        const label: egret.TextField = new egret.TextField();
        label.name = "label";
        label.x = 50;
        label.y = 50;
        wrapper.addChild(label);
        wrapper.zIndex = 1000;
        container.addChild(wrapper);
        //创建一个计时器对象
        var timer:egret.Timer = new egret.Timer(1000,5);
        let count = 5
        //注册事件侦听事件
        if(text === true){
            // let count = 30
            timer.addEventListener(egret.TimerEvent.TIMER,(event)=>{
                count -= 1;
                label.text = count.toFixed();
                if(count==3){
                    timer.stop()
                    container.removeChild(wrapper)
                    //绘制圆形
                    const wrapper1: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
                    const shape: egret.Shape = new egret.Shape();
                    const btnLabel: egret.TextField = new egret.TextField();
                    btnLabel.name = "label";
                    shape.graphics.beginFill(0xffffff,1);
                    shape.graphics.drawCircle(container.width / 2 - wrapper.width / 2,container.height / 2 - wrapper.height / 2,100);
                    shape.graphics.endFill();
                    btnLabel.x = container.width / 2 - wrapper.width / 2;
                    btnLabel.y = container.height / 2 - wrapper.height / 2;
                    btnLabel.zIndex = 1100;
                    btnLabel.textColor = 0x000000;
                    btnLabel.size = 50;
                    wrapper1.addChild(shape);
                    wrapper1.addChild(btnLabel);
                    container.addChild(wrapper1);
                    console.log('按钮文字',btnLabel)
                    var timer1:egret.Timer = new egret.Timer(1000,3);
                    timer1.addEventListener(egret.TimerEvent.TIMER,(event)=>{
                        btnLabel.text = count.toFixed();
                        count -= 1;
                        if(count == 0){
                            container.removeChild(wrapper1);
                            var s = new Utils()
                            console.log('构造函数',s.drawCup)
                            s.drawCup(['cup_json#dicing5','cup_json#dicing3','cup_json#dicing4'])
                        }
                        console.log('开始计时1',btnLabel.text)
                    },this)
                    timer1.start()
                }
                console.log('开始计时',label.text)
            },this);
        }else{
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,(event)=>{
                console.log('计时结束')
                label.text = "";
            },this);
        }
        //开始计时
        timer.start();
    }
    //绘制圆形
    static drawCircle(color: number, x:number,y:number): egret.Shape {
        const shape: egret.Shape = new egret.Shape();
        shape.zIndex = 1000;
        shape.graphics.beginFill(color,1);
        shape.graphics.drawCircle(x,y,100);
        shape.graphics.endFill();
        return shape;
    }
    //开始按钮
    static drawBtn(){
        var myGroup = new eui.Group();
        var btn:eui.Button = new eui.Button();
        btn.label = "我是一只小小的 egret 按钮";
        btn.horizontalCenter = 0;
        btn.verticalCenter = 0;
        btn.zIndex = 10000;
        myGroup.addChild( btn );
        const wrapper: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        const shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x00000,1);
        shp.graphics.drawRoundRect(0, 0, wrapper.width, wrapper.height, 20, 20);
        shp.graphics.endFill();
        wrapper.addChild(shp);
        myGroup.addChild(wrapper)
    }
}