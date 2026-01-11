import { Button, HStack, Text, Box, VStack, Spacer } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { SoundUtils } from "./utils/sound-utils";
import ConfirmModal from "./ConfirmModal";
import SoundModal, { Sound } from "./SoundModal";
import PlayPauseButton from "./PlayPauseButton";

const CALC_BUTTON_HEIGHT = "80px";
const NUMBER_COLOR = "blue";
const OPERATOR_COLOR = "yellow";
const EQUAL_COLOR = "red";
const LIFE_WIDTH = "175px";
const LIFE_HEIGHT = "60px";

const life2Sound = new SoundUtils(`src/sounds/life2.mp3`);
const gameoverSound = new SoundUtils(`src/sounds/gameover.mp3`);

// type operators = "devide" | "product" | "minus" | "plus" | "mod";
const operators = {
  devide: "÷",
  product: "×",
  minus: "-",
  plus: "+",
  mod: "%",
} as const;

interface OperatorProps {
  operator: string;
  onClickOperator?: (operator: string) => void;
}

const OperatorButton = (props: OperatorProps) => {
  return (
    <Button
      height={CALC_BUTTON_HEIGHT}
      width={CALC_BUTTON_HEIGHT}
      colorScheme={OPERATOR_COLOR}
      fontSize={"30px"}
      textAlign={"center"}
      onClick={() => {
        console.log(`${props.operator}`);
        props.onClickOperator
          ? props.onClickOperator?.(props.operator)
          : undefined;
      }}
    >
      {props.operator}
    </Button>
  );
};

interface NumberButtonProps {
  num: string;
  onClickNum?: (num: string) => void;
}
const NumberButton = (props: NumberButtonProps) => {
  return (
    <Button
      height={CALC_BUTTON_HEIGHT}
      width={CALC_BUTTON_HEIGHT}
      colorScheme={NUMBER_COLOR}
      fontSize={"25px"}
      onClick={() => {
        console.log(`${props.num}`);
        props.onClickNum ? props.onClickNum?.(props.num) : undefined;
      }}
    >
      {props.num}
    </Button>
  );
};

interface ClearButtonProps {
  onClickClearButton?: () => void;
}

const ClearButton = (props: ClearButtonProps) => {
  return (
    <Button
      height={CALC_BUTTON_HEIGHT}
      width={CALC_BUTTON_HEIGHT}
      fontSize={"20px"}
      colorScheme={"green"}
      onClick={() => {
        console.log(`clear`);
        props.onClickClearButton ? props.onClickClearButton() : undefined;
      }}
    >
      CLR
    </Button>
  );
};

interface EqualButtonProps {
  onClickEqualButton?: () => void;
}

const EqualButton = (props: EqualButtonProps) => {
  return (
    <Button
      height={"256px"}
      width={"80px"}
      colorScheme={EQUAL_COLOR}
      fontSize={"20px"}
      onClick={() => {
        console.log(`equal`);
        props.onClickEqualButton ? props.onClickEqualButton() : undefined;
      }}
    >
      =
    </Button>
  );
};

const Blank = () => {
  return <Box height={CALC_BUTTON_HEIGHT} width={CALC_BUTTON_HEIGHT}></Box>;
};

interface PlayerLifeProps {
  onClickPlayerLife?: (playerIndex: number) => void;
  firstPlayerLife: string;
  secondPlayerLife: string;
  playerIndex: number;
}

const PlayerLife = (props: PlayerLifeProps) => {
  const { playerIndex, firstPlayerLife, secondPlayerLife } = props;

  const onClickPlayerLife = (index: number) => {
    props.onClickPlayerLife ? props.onClickPlayerLife(index) : undefined;
  };

  return (
    <>
      <HStack paddingBottom={"5px"}>
        <Button
          fontSize="50px"
          height={LIFE_HEIGHT}
          width={LIFE_WIDTH}
          bgColor={playerIndex === 0 ? "red.1" : "red.2"}
          _hover={"none"}
          color={"white"}
          onClick={() => {
            onClickPlayerLife(0);
          }}
        >
          {firstPlayerLife}
        </Button>
        <Button
          fontSize="50px"
          height={LIFE_HEIGHT}
          width={LIFE_WIDTH}
          bgColor={playerIndex === 1 ? "blue.1" : "blue.2"}
          _hover={"none"}
          color={"white"}
          onClick={() => {
            onClickPlayerLife(1);
          }}
        >
          {secondPlayerLife}
        </Button>
      </HStack>
    </>
  );
};

interface PlayButtonProps {
  onClickPlayButton?: () => void;
}

const PlayButton = (props: PlayButtonProps) => {
  return (
    <Button
      colorScheme="gray"
      height={"50px"}
      // width={CALC_BUTTON_HEIGHT}
      width={"168px"}
      onClick={() => {
        props.onClickPlayButton ? props.onClickPlayButton() : undefined;
      }}
    >
      PLAY
    </Button>
  );
};

const Calculator = () => {
  const FIRST_LIFE = "8000";
  const [currentValue, setCurrentValue] = useState(""); // 現在入力している数字
  const [previousValue, setPreviousValue] = useState([FIRST_LIFE, FIRST_LIFE]); // 演算前の数字
  const [operator, setOperator] = useState("-"); // 現在の演算子
  const [playerIndex, setPlayerIndex] = useState(0);
  const sampleVal = useRef("");
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isSoundModal, setIsSoundModal] = useState(false);

  const [activeSound, setActiveSound] = useState<SoundUtils | null>(null);
  const [activeSoundInfo, setActiveSoundInfo] = useState<{
    title: string;
    path: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (previousValue.some((life) => life === "0")) {
      setIsConfirmModal(true);
    }
  }, [previousValue]);

  const togglePlayback = () => {
    if (!activeSound) return;

    if (isPlaying) {
      activeSound.pauseAudio();
    } else {
      activeSound.playAudio();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectAndPlay = (sound: Sound) => {
    if (activeSoundInfo?.path !== sound.path) {
      activeSound?.stopAudio();

      const newSound = new SoundUtils(sound.path, () => setIsPlaying(false));
      newSound.playAudio();

      setActiveSound(newSound);
      setActiveSoundInfo({ title: sound.displayName, path: sound.path });
      setIsPlaying(true);
    } else {
      togglePlayback();
    }
  };

  const onChangePlayerIndex = (num: number) => {
    console.log(`num_${num}`);
    setPlayerIndex(num);
    if (!operator) {
      setOperator("-");
    }
  };

  const onClickNumButton = (num: string) => {
    if (
      (!currentValue && (num === "0" || num === "00" || num === "000")) ||
      (!previousValue[playerIndex] && !operator)
    ) {
      return;
    }
    if ((currentValue + num).length > 6) {
      return;
    }
    setCurrentValue(currentValue + num);
    sampleVal.current = currentValue + num;
    console.log("current", currentValue);
    console.log("sample", sampleVal);
  };

  const onClickOperatorButton = (operator: string) => {
    // if (!previousValue[playerIndex]) {
    //   setPreviousValue(
    //     playerIndex === 0
    //       ? [currentValue, previousValue[1]]
    //       : [previousValue[0], currentValue]
    //   );
    // } else if (previousValue[playerIndex] && currentValue[playerIndex]) {
    //   const CHECK_IF_NUMBER = /^[0-9]+$/;
    //   if (
    //     !(
    //       CHECK_IF_NUMBER.test(previousValue[playerIndex]) &&
    //       CHECK_IF_NUMBER.test(currentValue[playerIndex])
    //     )
    //   ) {
    //     return;
    //   }

    //   let answer = 0;
    //   const previousValueNum = Number(previousValue[playerIndex]);
    //   const currentValueNum = Number(currentValue[playerIndex]);

    //   switch (operator) {
    //     case operators.devide:
    //       answer = Math.round(previousValueNum / currentValueNum);
    //       break;
    //     case operators.minus:
    //       answer = previousValueNum - currentValueNum;
    //       if (answer < 0) {
    //         answer = 0;
    //       }
    //       break;
    //     case operators.plus:
    //       answer = previousValueNum + currentValueNum;
    //       break;
    //   }
    //   console.log(answer);

    //   setPreviousValue(
    //     playerIndex === 0
    //       ? [answer.toString(), previousValue[1]]
    //       : [previousValue[0], answer.toString()]
    //   );
    // }

    // setCurrentValue(previousValue[playerIndex]);

    setOperator(operator);
  };

  const onClickClearButton = () => {
    setCurrentValue("");
  };

  const onClickEqualButton = () => {
    if (
      !(previousValue[playerIndex] && currentValue) ||
      !operator
    ) {
      return;
    }
    let answer = 0;
    const previousValueNum = Number(previousValue[playerIndex]);
    const currentValueNum = Number(currentValue);

    switch (operator) {
      case operators.devide:
        answer = Math.round(previousValueNum / currentValueNum);
        break;
      case operators.minus:
        answer = previousValueNum - currentValueNum;
        if (answer < 0) {
          answer = 0;
        }
        break;
      case operators.plus:
        answer = previousValueNum + currentValueNum;
        break;
    }

    setPreviousValue(
      playerIndex === 0
        ? [answer.toString(), previousValue[1]]
        : [previousValue[0], answer.toString()]
    );
    setCurrentValue("");
    setOperator("-");
    life2Sound.playAudio();
  };

  return (
    <>
      <VStack>
        <PlayerLife
          playerIndex={playerIndex}
          firstPlayerLife={previousValue[0]}
          secondPlayerLife={previousValue[1]}
          onClickPlayerLife={(num) => {
            onChangePlayerIndex(num);
          }}
        />

        <HStack
          borderBottom="3px solid gray"
          width="158px"
          height="30px"
          fontSize={"30px"}
        >
          <Text marginLeft="15px">{operator}</Text>
          <Spacer />
          <Text marginRight={"15px"}>{currentValue}</Text>
        </HStack>

        <VStack>
          <HStack>
            <NumberButton num="7" onClickNum={onClickNumButton} />
            <NumberButton num="8" onClickNum={onClickNumButton} />
            <NumberButton num="9" onClickNum={onClickNumButton} />
            <ClearButton onClickClearButton={onClickClearButton} />
          </HStack>
          <HStack>
            <VStack>
              <HStack>
                <NumberButton num="4" onClickNum={onClickNumButton} />
                <NumberButton num="5" onClickNum={onClickNumButton} />
                <NumberButton num="6" onClickNum={onClickNumButton} />
              </HStack>
              <HStack>
                <NumberButton num="1" onClickNum={onClickNumButton} />
                <NumberButton num="2" onClickNum={onClickNumButton} />
                <NumberButton num="3" onClickNum={onClickNumButton} />
              </HStack>
              <HStack>
                <NumberButton num="0" onClickNum={onClickNumButton} />
                <NumberButton num="00" onClickNum={onClickNumButton} />
                <NumberButton num="000" onClickNum={onClickNumButton} />
              </HStack>
            </VStack>

            <EqualButton onClickEqualButton={onClickEqualButton} />
          </HStack>
        </VStack>
        {/* <HStack>
          <ClearButton onClickClearButton={onClickClearButton} />
          <EqualButton onClickEqualButton={onClickEqualButton} />
        </HStack> */}

        <HStack>
          <OperatorButton
            operator={operators.minus}
            onClickOperator={onClickOperatorButton}
          />
          <OperatorButton
            operator={operators.plus}
            onClickOperator={onClickOperatorButton}
          />
          <OperatorButton
            operator={operators.devide}
            onClickOperator={onClickOperatorButton}
          />
          <Box
            height={CALC_BUTTON_HEIGHT}
            width={CALC_BUTTON_HEIGHT}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <PlayPauseButton
              onClick={togglePlayback}
              isPlaying={isPlaying}
              width={CALC_BUTTON_HEIGHT}
              height={CALC_BUTTON_HEIGHT}
            />
          </Box>
        </HStack>
        <HStack>
          <Button
            // height={CALC_BUTTON_HEIGHT}
            // width={CALC_BUTTON_HEIGHT}
            height={"50px"}
            width={"168px"}
            colorScheme="blackAlpha"
            onClick={() => {
              setIsConfirmModal(true);
            }}
          >
            RESET
          </Button>

          <PlayButton
            onClickPlayButton={() => {
              setIsSoundModal(true);
            }}
          />
        </HStack>
        <Text fontSize="sm" height="20px">
          {"music: " + activeSoundInfo?.title || "No sound selected"}
        </Text>
      </VStack>
      <ConfirmModal
        isOpen={isConfirmModal}
        confirmText="...ｼﾃ......ｺﾛ...ｼﾃ......"
        yesButtonText="YES"
        noButtonText="NO"
        onClickYesButton={() => {
          console.log("yes");
          setPreviousValue([FIRST_LIFE, FIRST_LIFE]);
          setCurrentValue("");
          setOperator("-");
          setIsConfirmModal(false);
          gameoverSound.playAudio();
        }}
        onClickNoButton={() => {
          console.log("no");
          setIsConfirmModal(false);
        }}
        onClickCloseButton={() => {
          console.log("close");
          setIsConfirmModal(false);
        }}
      />

      <SoundModal
        isOpen={isSoundModal}
        onClickCloseButton={() => {
          setIsSoundModal(false);
        }}
        handleSelectAndPlay={handleSelectAndPlay}
        activeSoundInfo={activeSoundInfo}
        isPlaying={isPlaying}
      />
    </>
  );
};

export default Calculator;

