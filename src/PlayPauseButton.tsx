import { Button } from "@chakra-ui/react";

import { IconContext } from "react-icons";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { useState, useEffect } from "react";
import { SoundUtils } from "./utils/sound-utils";

const PLAY_BUTTON_WIDTH = "30px";

interface PlayPauseButtonProps {
  path: string;
}

const PlayPauseButton = (props: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onEndSound = () => {
    setIsPlaying(false);
  };

  const sound = new SoundUtils(props.path, onEndSound);

  // isPlaying が変わったときにサウンドを再生/停止
  useEffect(() => {
    if (isPlaying) {
      sound.playAudio();
    } else {
      sound.stopAudio();
    }
    // コンポーネントがアンマウントされたときにサウンドを停止する
    return () => {
      sound.stopAudio();
    };
  }, [isPlaying, sound]);

  return (
    <Button
      width={PLAY_BUTTON_WIDTH}
      height={PLAY_BUTTON_WIDTH}
      color={"green"}
      bgColor="transparent"
      p={"0"}
      onClick={() => {
        setIsPlaying((prevState) => !prevState); // 状態のトグル
      }}
    >
      <IconContext.Provider value={{ size: "100%" }}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </IconContext.Provider>
    </Button>
  );
};

export default PlayPauseButton;
