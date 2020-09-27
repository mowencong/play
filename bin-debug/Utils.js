var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Utils = (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super.call(this) || this;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.drawRect = function (color, arr) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(arr[0], arr[1], arr[2], arr[3]);
        shape.graphics.endFill();
        return shape;
    };
    Utils.drawRoundRect = function (color, arr) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRoundRect(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
        shape.graphics.endFill();
        return shape;
    };
    //提示文本
    Utils.toast = function (text, container) {
        var wrapper = new egret.DisplayObjectContainer();
        var shp = new egret.Shape();
        var panel = new egret.TextField();
        panel.text = text;
        // panel.textAlign = egret.HorizontalAlign.CENTER;
        // panel.verticalAlign = egret.VerticalAlign.MIDDLE;
        var paddingLeft = 10;
        var paddingUp = 20;
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
        egret.setTimeout(function () {
            container.removeChild(wrapper);
        }, container, 1000);
    };
    //计时器
    Utils.drawtime = function (text, container) {
        var _this = this;
        var wrapper = new egret.DisplayObjectContainer();
        var label = new egret.TextField();
        label.name = "label";
        label.x = 50;
        label.y = 50;
        wrapper.addChild(label);
        wrapper.zIndex = 1000;
        container.addChild(wrapper);
        //创建一个计时器对象
        var timer = new egret.Timer(1000, 5);
        var count = 5;
        //注册事件侦听事件
        if (text === true) {
            // let count = 30
            timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                count -= 1;
                label.text = count.toFixed();
                if (count == 3) {
                    timer.stop();
                    container.removeChild(wrapper);
                    //绘制圆形
                    var wrapper1_1 = new egret.DisplayObjectContainer();
                    var shape = new egret.Shape();
                    var btnLabel_1 = new egret.TextField();
                    btnLabel_1.name = "label";
                    shape.graphics.beginFill(0xffffff, 1);
                    shape.graphics.drawCircle(container.width / 2 - wrapper.width / 2, container.height / 2 - wrapper.height / 2, 100);
                    shape.graphics.endFill();
                    btnLabel_1.x = container.width / 2 - wrapper.width / 2;
                    btnLabel_1.y = container.height / 2 - wrapper.height / 2;
                    btnLabel_1.zIndex = 1100;
                    btnLabel_1.textColor = 0x000000;
                    btnLabel_1.size = 50;
                    wrapper1_1.addChild(shape);
                    wrapper1_1.addChild(btnLabel_1);
                    container.addChild(wrapper1_1);
                    console.log('按钮文字', btnLabel_1);
                    var timer1 = new egret.Timer(1000, 3);
                    timer1.addEventListener(egret.TimerEvent.TIMER, function (event) {
                        btnLabel_1.text = count.toFixed();
                        count -= 1;
                        if (count == 0) {
                            container.removeChild(wrapper1_1);
                            var s = new Utils();
                            console.log('构造函数', s.drawCup);
                            s.drawCup(['cup_json#dicing5', 'cup_json#dicing3', 'cup_json#dicing4']);
                        }
                        console.log('开始计时1', btnLabel_1.text);
                    }, _this);
                    timer1.start();
                }
                console.log('开始计时', label.text);
            }, this);
        }
        else {
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
                console.log('计时结束');
                label.text = "";
            }, this);
        }
        //开始计时
        timer.start();
    };
    //绘制圆形
    Utils.drawCircle = function (color, x, y) {
        var shape = new egret.Shape();
        shape.zIndex = 1000;
        shape.graphics.beginFill(color, 1);
        shape.graphics.drawCircle(x, y, 100);
        shape.graphics.endFill();
        return shape;
    };
    //开始按钮
    Utils.drawBtn = function () {
        var myGroup = new eui.Group();
        var btn = new eui.Button();
        btn.label = "我是一只小小的 egret 按钮";
        btn.horizontalCenter = 0;
        btn.verticalCenter = 0;
        btn.zIndex = 10000;
        myGroup.addChild(btn);
        var wrapper = new egret.DisplayObjectContainer();
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x00000, 1);
        shp.graphics.drawRoundRect(0, 0, wrapper.width, wrapper.height, 20, 20);
        shp.graphics.endFill();
        wrapper.addChild(shp);
        myGroup.addChild(wrapper);
    };
    return Utils;
}(Desk));
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map