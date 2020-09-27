/** 技能倒計時 */
class SkillMask {

    private shape:egret.Shape;
    private radius:number;//半徑
    private cenPoint:egret.Point;//圓心坐標
    private txt:egret.TextField;
    private static START_ANGLE: number = -Math.PI / 2;//開始角度
    private static END_ANGLE: number = Math.PI * 3 / 2;//結束角度

    private countNum:number;//計時
    private timeStamp:number;//記錄開始的時間戳
    private totalTime:number;//倒計時縂時間
    private callBack:Function;//結束回調函數
    private thisObj:Object;//回調携帶的this
    private param:any;//回調參數

    public constructor(target:egret.DisplayObjectContainer, radius:number) {
        if(!target){
            console.error("技能模板參數有誤");
            return;
        }
        let shape = new egret.Shape();
        this.shape = shape;
        target.addChild(shape);
        let txt = new egret.TextField();
        this.txt = txt;
        txt.size = 30;
        txt.textColor = 0xffffff;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.text = "0";
        txt.width = target.width;
        txt.y = (target.height - txt.height)/2;
        txt.text = "";
        target.addChild(txt);
        this.cenPoint = new egret.Point(target.width/2, target.height/2);
        this.radius = radius;
    }

    /**
     * @param totalTime 倒計時縂時間（毫秒）
     * @param completeFunc 倒計時結束回調函數
     * @param thisObj 回調函數携帶的this對象
     * @param param 回調携帶的參數（非必須）
     */
    public start(totalTime:number, completeFunc:Function, thisObj:Object, param?:any){
        if(totalTime<0){
            console.error("start函數參數有誤");
            return;
        }
        egret.stopTick(this.onTick, this);
        this.totalTime = totalTime;
        this.callBack = completeFunc;
        this.thisObj = thisObj;
        this.param = param;
        this.timeStamp = egret.getTimer();
        this.countNum = 0;
        //可以采用項目中通用的計時器，這裏暫時用這個
        egret.startTick(this.onTick, this);
    }

    private onTick(timeStamp:number):boolean{
        let nowTime = egret.getTimer();
        this.countNum += nowTime-this.timeStamp;
        this.timeStamp = nowTime;
        console.log(timeStamp);
        if(this.countNum>this.totalTime){
            this.txt.text = "";
            this.shape.graphics.clear();
            egret.stopTick(this.onTick, this);
            if(this.callBack){
                this.callBack.call(this.thisObj, this.param);
            }
        }else{
            let startAngle = SkillMask.START_ANGLE + (this.countNum/this.totalTime)*Math.PI*2;
            let endAngle = SkillMask.END_ANGLE;
            this.drawCircle(startAngle, endAngle);
            this.txt.text = "" + Math.ceil((this.totalTime-this.countNum)/1000);
        }
        return true;
    }

    /** 繪製圓弧 */
    private drawCircle(startAngle:number, endAngle:number){
        let shape = this.shape;
        let point = this.cenPoint;

        shape.graphics.clear();
        shape.graphics.beginFill(0x0,0.5);
        shape.graphics.moveTo(point.x, point.y);//移到圓心點
        shape.graphics.lineTo(point.x, 0);//畫開始縣
        shape.graphics.drawArc(point.x, point.y, this.radius, startAngle, endAngle, false);//默認順時針畫
        shape.graphics.lineTo(point.x,point.y);
        shape.graphics.endFill();
    }
}