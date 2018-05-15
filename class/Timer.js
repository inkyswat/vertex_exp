class Timer
{
    constructor(time)
    {
        this.time = time;
        this.GetTime(this.time);
        var TimeStamp = 0;
        var TimeDiff = 0;
    }
    GetTime(time)
    {
        this.TimeStamp = new Date();
    }
    GetDiff()
    {
        this.TimeDiff = this.TimeStamp.getTime()
    }
}