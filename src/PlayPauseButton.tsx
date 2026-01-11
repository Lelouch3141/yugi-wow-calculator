import { IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

interface Props {
  isPlaying: boolean;
  onClick: () => void;
  width?: string;
  height?: string;
}

const PlayPauseButton = (props: Props) => {
  return (
    <IconButton
      aria-label="play-pause"
      icon={props.isPlaying ? <FaPause /> : <FaPlay />}
      onClick={props.onClick}
      width={props.width}
      height={props.height}
    />
  );
};

export default PlayPauseButton;
