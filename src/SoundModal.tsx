import {
  Modal,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import PlayPauseButton from "./PlayPauseButton";

export interface Sound {
  displayName: string;
  path: string;
}
export const soundList: Sound[] = [
  { displayName: "熱き決闘者たち", path: `src/sounds/atsuki_duelists.mp3` },
  { displayName: "神の怒り", path: `src/sounds/god.mp3` },
  { displayName: "十代のテーマ", path: `src/sounds/gx.mp3` },
  { displayName: "遊星のテーマ", path: `src/sounds/yusei.mp3` },
  { displayName: "破壊", path: "src/sounds/broken.mp3" },
  { displayName: "カードセット", path: "src/sounds/card_set.mp3" },
  { displayName: "召喚", path: `src/sounds/syoukann.mp3` },
  { displayName: "カン☆コーン", path: `src/sounds/kan_korn.mp3` },
  { displayName: "CM", path: `src/sounds/CM.mp3` },
  { displayName: "決闘開始", path: `src/sounds/isono.mp3` },
  {
    displayName: "ショットガンシャッフル",
    path: `src/sounds/shotgun_shuffle.mp3`,
  },
  { displayName: "次回予告", path: `src/sounds/jonouchi_shisu.mp3` },
  {
    displayName: "ブルーアイズ",
    path: "src/sounds/blue_eyes_ultimate_zyonouchi_kun.mp3",
  },

  { displayName: "SEED", path: `src/sounds/seed_break.mp3` },
  { displayName: "フリーダム", path: `src/sounds/flight_freedom.mp3` },
  { displayName: "meteor", path: `src/sounds/meteor.mp3` },

  { displayName: "お前を殺す", path: `src/sounds/omae_wo_korosu.mp3` },

  { displayName: "処刑用BGM", path: `src/sounds/syokeiyou_bgm.mp3` },
  { displayName: "ユニコォォォォオオン", path: `src/sounds/unicorn.mp3` },
];

interface SoundModalProps {
  isOpen: boolean;
  onClickCloseButton?: () => void;
  handleSelectAndPlay: (sound: Sound) => void;
  activeSoundInfo: { title: string; path: string } | null;
  isPlaying: boolean;
}

const SoundModal = (props: SoundModalProps) => {
  const { isOpen, activeSoundInfo, isPlaying, handleSelectAndPlay } = props;
  const { onClose } = useDisclosure();

  const onClickCloseButton = () => {
    props.onClickCloseButton ? props.onClickCloseButton() : undefined;
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClickCloseButton();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>SOUND</Th>
                  <Th>PLAY</Th>
                </Tr>
              </Thead>
              <Tbody>
                {soundList.map((sound, index) => (
                  <Tr key={index}>
                    <Td>{sound.displayName}</Td>
                    <Td>
                      <PlayPauseButton
                        onClick={() => handleSelectAndPlay(sound)}
                        isPlaying={
                          activeSoundInfo?.path === sound.path && isPlaying
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SoundModal;
