declare module 'rolling-spider' {
    class Drone {
        connect(callback: (err: Error) => void);
        setup(callback: (err: Error) => void);

        takeOff();
        land();
        emergency();
        flatTrim();
        startPing();

        goForward(opts: MoveOpts);
        goBackward(opts: MoveOpts);
        goUp(opts: MoveOpts);
        goDown(opts: MoveOpts);
        turnLeft(opts: MoveOpts);
        turnRight(opts: MoveOpts);
        tiltLeft(opts: MoveOpts);
        tiltRight(opts: MoveOpts);
        flipForward(opts: MoveOpts);
        flipBackward(opts: MoveOpts);
        flipLeft(opts: MoveOpts);
        flipRight(opts: MoveOpts);

        isDronePeripheral(peripheral): boolean;
    }
    
    export = Drone;

    interface MoveOpts {
        steps: number;
    }
    
}