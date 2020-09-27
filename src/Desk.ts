class Desk extends egret.DisplayObjectContainer {
    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private  myGroup:eui.Group;
    private onAddToStage() {
        this.drawDesk()
        this.drawChips()
        this.drawCup(['cup_json#dice1','cup_json#dice2','cup_json#dice3'])
        this.drawBtn()
    }
    //开始按钮
    private drawBtn(){
        //设置Group,用于给按钮布局，具体可参看布局示例。
       const wrapper: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        const shp: egret.Shape = new egret.Shape();
        const panel: egret.TextField = new egret.TextField();
        panel.text = '开始下注';
        panel.textColor = 0x000000;
        panel.size = 50;
        // panel.textAlign = egret.HorizontalAlign.CENTER;
        // panel.verticalAlign = egret.VerticalAlign.MIDDLE;
        const paddingLeft = 100;
        const paddingUp = 40;
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
        wrapper.addEventListener(egret.TouchEvent.TOUCH_TAP,(event)=>{
            console.log('点击开始按钮',event)
            this.removeChild(wrapper)
            let time = Utils.drawtime(true,this)
        },this,true,1)
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
    }
    
    // 画桌面
    private drawDesk() {
        const desk = Utils.createBitmapByName('desktop_png');
        this.addChild(desk);
        desk.x = (this.stage.stageWidth - desk.width) / 2;
        desk.y = (this.stage.stageHeight - desk.height) / 2;
        //启用舞台的鼠标支持
        mouse.enable(this.stage);
        desk.touchEnabled = true;
        // desk.addEventListener(mouse.MouseEvent.ROLL_OVER, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.MOUSE_MOVE, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.ROLL_OUT, (e) => console.log(e), this);
        // desk.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => console.log(e), this);
        // desk.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => console.log(e), this);
        // desk.addEventListener(mouse.MouseEvent.MOUSE_OUT, (e) => console.log(e), this);
        for (let key in SicboConfig) {
            if (SicboConfig[key].length === 0) {
                continue;
            }
            const roundRect = Utils.drawRoundRect(0x000000, SicboConfig[key]);
            roundRect.alpha = 0;
            roundRect.touchEnabled = true;
            this.addChild(roundRect);
            roundRect.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
                if (!GlobalData.activeChipKey) {
                    Utils.toast('请点击底部选择一个筹码', this);
                } else {
                    // 飞出筹码
                    const chip = Utils.createBitmapByName(`chips_json#${GlobalData.activeChipKey.slice(0, -1)}`);
                    const config = ChipsConfig[GlobalData.activeChipKey];
                    chip.width = config[2];
                    chip.height = config[3];
                    chip.x = config[0];
                    chip.y = config[1];
                    const point: egret.Point = this.globalToLocal(event.stageX, event.stageY);
                    this.addChild(chip);
                    egret.Tween.get(chip).to({
                        x: SicboConfig[key][0] + (SicboConfig[key][2] - chip.width) / 2,
                        y: SicboConfig[key][1] + (SicboConfig[key][3] - chip.height) / 2,
                    }, 360).call(() => { });
                }
            }, this);
        }
    }
    // 画底部飞盘
    private drawChips() {
        const yPlus = -20;
        let yPlusedChip;
        for (let key in ChipsConfig) {
            const config = ChipsConfig[key]
            const chip = Utils.createBitmapByName(`chips_json#${key}`);
            chip.width = config[2];
            chip.height = config[3];
            chip.x = config[0];
            chip.y = config[1];
            chip.touchEnabled = true;
            this.addChild(chip);
            chip.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
                if (yPlusedChip !== chip) {
                    chip.y = chip.y + yPlus;
                    chip.texture = RES.getRes(`chips_json#${key.slice(0, -1)}`);
                    if (yPlusedChip) {
                        yPlusedChip.y = yPlusedChip.y - yPlus;
                        yPlusedChip.texture = RES.getRes(`chips_json#${GlobalData.activeChipKey}`);
                    }
                    yPlusedChip = chip
                    GlobalData.activeChipKey = key
                }
            }, this);
        }
    }
    // 画盅
    public drawCup(arr:Array<string>) {
        console.log('调用成功了吗',arr)
        const container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        container.name = "cup"
        container.x = CupConfig.container.x;
        container.y = CupConfig.container.y;
        this.addChild(container);
        const cup = Utils.createBitmapByName('cup_json#diceCup');
        cup.width = CupConfig.cup.width;
        cup.height = CupConfig.cup.height;
        container.addChild(cup);
        const diceLeft = Utils.createBitmapByName(arr[0]);
        diceLeft.width = CupConfig.diceLeft.width;
        diceLeft.height = CupConfig.diceLeft.height;
        diceLeft.x = CupConfig.diceLeft.x;
        diceLeft.y = CupConfig.diceLeft.y;
        const diceCenter = Utils.createBitmapByName(arr[1]);
        diceCenter.width = CupConfig.diceCenter.width;
        diceCenter.height = CupConfig.diceCenter.height;
        diceCenter.x = CupConfig.diceCenter.x;
        diceCenter.y = CupConfig.diceCenter.y;
        const diceRight = Utils.createBitmapByName(arr[2]);
        diceRight.width = CupConfig.diceRight.width;
        diceRight.height = CupConfig.diceRight.height;
        diceRight.x = CupConfig.diceRight.x;
        diceRight.y = CupConfig.diceRight.y;
        container.addChild(diceLeft);
        container.addChild(diceCenter);
        container.addChild(diceRight);
        console.log('sdsdsdsdsd',diceLeft,diceCenter,diceRight)
    //    egret.setTimeout(() => {
    //         egret.Tween.get(diceLeft).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y-20},1000).call(()=>{})
    //         egret.Tween.get(diceCenter).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y},1000).call(()=>{})
    //         egret.Tween.get(diceRight).to({x:CupConfig.diceCenter.x,y:CupConfig.diceCenter.y-30},1000).call(()=>{})
    //     }, container, 3000);
    }
    //下注时间到
    private drawTime(){
        const time = 5000
        setTimeout(()=>{

        },5000)
    }

}