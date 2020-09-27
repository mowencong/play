var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 技能倒計時 */
var SkillMask = (function () {
    function SkillMask(target, radius) {
        if (!target) {
            console.error("技能模板參數有誤");
            return;
        }
        var shape = new egret.Shape();
        this.shape = shape;
        target.addChild(shape);
        var txt = new egret.TextField();
        this.txt = txt;
        txt.size = 30;
        txt.textColor = 0xffffff;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.text = "0";
        txt.width = target.width;
        txt.y = (target.height - txt.height) / 2;
        txt.text = "";
        target.addChild(txt);
        this.cenPoint = new egret.Point(target.width / 2, target.height / 2);
        this.radius = radius;
    }
    /**
     * @param totalTime 倒計時縂時間（毫秒）
     * @param completeFunc 倒計時結束回調函數
     * @param thisObj 回調函數携帶的this對象
     * @param param 回調携帶的參數（非必須）
     */
    SkillMask.prototype.start = function (totalTime, completeFunc, thisObj, param) {
        if (totalTime < 0) {
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
    };
    SkillMask.prototype.onTick = function (timeStamp) {
        var nowTime = egret.getTimer();
        this.countNum += nowTime - this.timeStamp;
        this.timeStamp = nowTime;
        console.log(timeStamp);
        if (this.countNum > this.totalTime) {
            this.txt.text = "";
            this.shape.graphics.clear();
            egret.stopTick(this.onTick, this);
            if (this.callBack) {
                this.callBack.call(this.thisObj, this.param);
            }
        }
        else {
            var startAngle = SkillMask.START_ANGLE + (this.countNum / this.totalTime) * Math.PI * 2;
            var endAngle = SkillMask.END_ANGLE;
            this.drawCircle(startAngle, endAngle);
            this.txt.text = "" + Math.ceil((this.totalTime - this.countNum) / 1000);
        }
        return true;
    };
    /** 繪製圓弧 */
    SkillMask.prototype.drawCircle = function (startAngle, endAngle) {
        var shape = this.shape;
        var point = this.cenPoint;
        shape.graphics.clear();
        shape.graphics.beginFill(0x0, 0.5);
        shape.graphics.moveTo(point.x, point.y); //移到圓心點
        shape.graphics.lineTo(point.x, 0); //畫開始縣
        shape.graphics.drawArc(point.x, point.y, this.radius, startAngle, endAngle, false); //默認順時針畫
        shape.graphics.lineTo(point.x, point.y);
        shape.graphics.endFill();
    };
    SkillMask.START_ANGLE = -Math.PI / 2; //開始角度
    SkillMask.END_ANGLE = Math.PI * 3 / 2; //結束角度
    return SkillMask;
}());
__reflect(SkillMask.prototype, "SkillMask");
//# sourceMappingURL=SkillMask.js.map