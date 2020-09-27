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
var Desk = (function (_super) {
    __extends(Desk, _super);
    function Desk() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Desk.prototype.onAddToStage = function () {
        this.drawDesk();
        this.drawChips();
        // this.drawCup(['cup_json#dice1','cup_json#dice2','cup_json#dice3'])
        this.drawBtn();
    };
    //开始按钮
    Desk.prototype.drawBtn = function () {
        var _this = this;
        //设置Group,用于给按钮布局，具体可参看布局示例。
        var wrapper = new egret.DisplayObjectContainer();
        var shp = new egret.Shape();
        var panel = new egret.TextField();
        panel.text = '开始下注';
        panel.textColor = 0x000000;
        panel.size = 50;
        // panel.textAlign = egret.HorizontalAlign.CENTER;
        // panel.verticalAlign = egret.VerticalAlign.MIDDLE;
        var paddingLeft = 100;
        var paddingUp = 40;
        wrapper.width = panel.width + paddingLeft * 2;
        wrapper.height = panel.height + paddingUp * 2;
        // 居中
        panel.x = paddingLeft;
        panel.y = paddingUp;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRoundRect(0, 0, wrapper.width, wrapper.height, 20, 20);
        shp.graphics.endFill();
        wrapper.addChild(shp);
        wrapper.addChild(panel);
        wrapper.x = (this.stage.stageWidth - wrapper.width) / 2;
        wrapper.y = (this.stage.stageHeight - wrapper.height) / 2;
        wrapper.zIndex = 1000;
        this.addChild(wrapper);
        wrapper.touchEnabled = true;
        wrapper.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            console.log('点击开始按钮', event);
            _this.removeChild(wrapper);
            var time = Utils.drawtime(true, _this);
        }, this, true, 1);
        //遮罩
        // const shpa: egret.Shape = new egret.Shape();
        // shpa.zIndex = 1000;
        // shpa.alpha = 0.8;
        // shpa.graphics.beginFill( 0x000000 );
        // shpa.graphics.drawRect( 0,0,this.stage.stageWidth,this.stage.stageHeight);
        // shpa.graphics.endFill();
        // console.log('遮罩层',shpa)
        // wrapper.addChild( shpa );
        // shp.mask = shpa
        // shp.filters = [new egret.GlowFilter()];
    };
    // 画桌面
    Desk.prototype.drawDesk = function () {
        var _this = this;
        var desk = Utils.createBitmapByName('desktop_png');
        this.addChild(desk);
        desk.x = (this.stage.stageWidth - desk.width) / 2;
        desk.y = (this.stage.stageHeight - desk.height) / 2;
        //启用舞台的鼠标支持
        mouse.enable(this.stage);
        desk.touchEnabled = true;
        var _loop_1 = function (key) {
            if (SicboConfig[key].length === 0) {
                return "continue";
            }
            var roundRect = Utils.drawRoundRect(0x000000, SicboConfig[key]);
            roundRect.alpha = 0;
            roundRect.touchEnabled = true;
            this_1.addChild(roundRect);
            roundRect.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (!GlobalData.activeChipKey) {
                    Utils.toast('请点击底部选择一个筹码', _this);
                }
                else {
                    // 飞出筹码
                    var chip = Utils.createBitmapByName("chips_json#" + GlobalData.activeChipKey.slice(0, -1));
                    var config = ChipsConfig[GlobalData.activeChipKey];
                    chip.width = config[2];
                    chip.height = config[3];
                    chip.x = config[0];
                    chip.y = config[1];
                    var point = _this.globalToLocal(event.stageX, event.stageY);
                    _this.addChild(chip);
                    egret.Tween.get(chip).to({
                        x: SicboConfig[key][0] + (SicboConfig[key][2] - chip.width) / 2,
                        y: SicboConfig[key][1] + (SicboConfig[key][3] - chip.height) / 2,
                    }, 360).call(function () { });
                }
            }, this_1);
        };
        var this_1 = this;
        // desk.addEventListener(mouse.MouseEvent.ROLL_OVER, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.MOUSE_MOVE, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.ROLL_OUT, (e) => console.log(e), this);
        // desk.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => console.log(e), this);
        // desk.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.MOUSE_OUT, (e) => console.log(e), this);
        for (var key in SicboConfig) {
            _loop_1(key);
        }
    };
    // 画底部飞盘
    Desk.prototype.drawChips = function () {
        var yPlus = -20;
        var yPlusedChip;
        var _loop_2 = function (key) {
            var config = ChipsConfig[key];
            var chip = Utils.createBitmapByName("chips_json#" + key);
            chip.width = config[2];
            chip.height = config[3];
            chip.x = config[0];
            chip.y = config[1];
            chip.touchEnabled = true;
            this_2.addChild(chip);
            chip.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (yPlusedChip !== chip) {
                    chip.y = chip.y + yPlus;
                    chip.texture = RES.getRes("chips_json#" + key.slice(0, -1));
                    if (yPlusedChip) {
                        yPlusedChip.y = yPlusedChip.y - yPlus;
                        yPlusedChip.texture = RES.getRes("chips_json#" + GlobalData.activeChipKey);
                    }
                    yPlusedChip = chip;
                    GlobalData.activeChipKey = key;
                }
            }, this_2);
        };
        var this_2 = this;
        for (var key in ChipsConfig) {
            _loop_2(key);
        }
    };
    // 画盅
    Desk.prototype.drawCup = function (arr) {
        console.log('调用成功了吗', arr);
        var container = new egret.DisplayObjectContainer();
        container.name = "cup";
        container.x = CupConfig.container.x;
        container.y = CupConfig.container.y;
        this.addChild(container);
        var cup = Utils.createBitmapByName('cup_json#diceCup');
        cup.width = CupConfig.cup.width;
        cup.height = CupConfig.cup.height;
        container.addChild(cup);
        var diceLeft = Utils.createBitmapByName(arr[0]);
        diceLeft.width = CupConfig.diceLeft.width;
        diceLeft.height = CupConfig.diceLeft.height;
        diceLeft.x = CupConfig.diceLeft.x;
        diceLeft.y = CupConfig.diceLeft.y;
        var diceCenter = Utils.createBitmapByName(arr[1]);
        diceCenter.width = CupConfig.diceCenter.width;
        diceCenter.height = CupConfig.diceCenter.height;
        diceCenter.x = CupConfig.diceCenter.x;
        diceCenter.y = CupConfig.diceCenter.y;
        var diceRight = Utils.createBitmapByName(arr[2]);
        diceRight.width = CupConfig.diceRight.width;
        diceRight.height = CupConfig.diceRight.height;
        diceRight.x = CupConfig.diceRight.x;
        diceRight.y = CupConfig.diceRight.y;
        container.addChild(diceLeft);
        container.addChild(diceCenter);
        container.addChild(diceRight);
        console.log('sdsdsdsdsd', diceLeft, diceCenter, diceRight);
        //    egret.setTimeout(() => {
        //         egret.Tween.get(diceLeft).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y-20},1000).call(()=>{})
        //         egret.Tween.get(diceCenter).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y},1000).call(()=>{})
        //         egret.Tween.get(diceRight).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y-30},1000).call(()=>{})
        //     }, container, 3000);
    };
    //下注时间到
    Desk.prototype.drawTime = function () {
        var time = 5000;
        setTimeout(function () {
        }, 5000);
    };
    return Desk;
}(egret.DisplayObjectContainer));
__reflect(Desk.prototype, "Desk");
//# sourceMappingURL=Desk.js.map