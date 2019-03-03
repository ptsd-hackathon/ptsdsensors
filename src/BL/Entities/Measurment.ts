abstract class Measurment {

  constructor(
    private lowRed: number, lowYellow: number, lowGreen: number) {}

  public abstract getPositionInGeneralScale()   : MeasurmentScale;
  public abstract getPositionInPopulationScale(): MeasurmentScale;
  public abstract getPositionInPersonalScale()  : MeasurmentScale;


}
