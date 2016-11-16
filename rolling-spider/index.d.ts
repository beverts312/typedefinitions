declare module 'rolling-spider' {
    class Drone {
        constructor(uuid?:string);
        
        connect(callback: (err: Error) => void);
        setup(callback: (err: Error) => void);

        takeOff();
        land();
        emergency();
        flatTrim();
        startPing();

        forward(opts: MoveOpts);
        backward(opts: MoveOpts);
        up(opts: MoveOpts);
        down(opts: MoveOpts);
        turnLeft(opts: MoveOpts);
        turnRight(opts: MoveOpts);
        tiltLeft(opts: MoveOpts);
        tiltRight(opts: MoveOpts);
        frontFlip(opts: MoveOpts);
        backFlip(opts: MoveOpts);
        leftFlip(opts: MoveOpts);
        rightFlip(opts: MoveOpts);

        isDronePeripheral(peripheral): boolean;
    }
    
    export = Drone;

    interface MoveOpts {
        steps: number;
    }
    
}