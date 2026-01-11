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
  { displayName: "熱き決闘者たち", path: `/sounds/atsuki_duelists.mp3` },
  { displayName: "神の怒り", path: `/sounds/god.mp3` },
  { displayName: "十代のテーマ", path: `/sounds/gx.mp3` },
  { displayName: "遊星のテーマ", path: `/sounds/yusei.mp3` },
  { displayName: "破壊", path: "/sounds/broken.mp3" },
  { displayName: "カードセット", path: "/sounds/card_set.mp3" },
  { displayName: "召喚", path: `/sounds/syoukann.mp3` },
  { displayName: "カン☆コーン", path: `/sounds/kan_korn.mp3` },
  { displayName: "CM", path: `/sounds/CM.mp3` },
  { displayName: "決闘開始", path: `/sounds/isono.mp3` },
  {
    displayName: "ショットガンシャッフル",
    path: `/sounds/shotgun_shuffle.mp3`,
  },
  { displayName: "次回予告", path: `/sounds/jonouchi_shisu.mp3` },
  {
    displayName: "ブルーアイズ",
    path: "/sounds/blue_eyes_ultimate_zyonouchi_kun.mp3",
  },

  { displayName: "SEED", path: `/sounds/seed_break.mp3` },
  { displayName: "フリーダム", path: `/sounds/flight_freedom.mp3` },
  { displayName: "meteor", path: `/sounds/meteor.mp3` },

  { displayName: "お前を殺す", path: `/sounds/omae_wo_korosu.mp3` },

  { displayName: "処刑用BGM", path: `/sounds/syokeiyou_bgm.mp3` },
  { displayName: "ユニコォォォォオオン", path: `/sounds/unicorn.mp3` },
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
