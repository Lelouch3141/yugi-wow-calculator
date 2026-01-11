import { Howl } from "howler";

export class SoundUtils {
  private audioPath: string;
  private sound: Howl;

  constructor(audioPath: string, onEndSound?: () => void) {
    this.audioPath = audioPath;
    this.sound = new Howl({
      src: [audioPath],
      onplay: () => {},
      onend: () => {
        if (!onEndSound) {
          return;
        }
        onEndSound();
      },
    });
  }

  /**
   * 音声ファイル再生
   */
  playAudio(): void {
    console.log(this.audioPath);
    try {
      this.sound.play();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 音声ファイルの一時停止
   */
  pauseAudio(): void {
    try {
      this.sound.pause();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 音声ファイルの再生停止
   */
  stopAudio(): void {
    try {
      this.sound.stop();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 再生中かどうか
   */
  isPlaying(): boolean {
    return this.sound.playing();
  }

  getSrc(): string {
    return this.audioPath;
  }
}
