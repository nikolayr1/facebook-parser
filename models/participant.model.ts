import { ExclusionType } from '../enums/exlusion-type.enum';
import { ExclusionReason } from '../enums/exlusion-reason.enum';

/**
 * Participant model
 */
export class ParticipantModel {
  public updated: string;
  public score: number;
  public reports: number;
  public reportsKoef: number;
  public lastReportTime: string;
  public excluded: ExclusionType;
  public exclusionReason: ExclusionReason;
  public exclusionComment: string;

  public constructor(public photo: string,
                     public url: string,
                     public name: string,
                     public surname: string) {
    const nowTime = new Date().toString();
    this.updated = nowTime;
    this.score = 1000; // elo start rating
    this.reports = 0;
    this.reportsKoef = 0;
    this.lastReportTime = nowTime;
    this.excluded = ExclusionType.notExcluded;
    this.exclusionReason = ExclusionReason.notExcluded;
    this.exclusionComment = '';
  }
}
