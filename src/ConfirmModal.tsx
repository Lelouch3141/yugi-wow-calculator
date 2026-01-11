import {
  Modal,
  ModalContent,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Divider,
  VStack,
} from "@chakra-ui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  confirmText: string;
  yesButtonText: string;
  noButtonText: string;
  onClickYesButton?: () => void;
  onClickNoButton?: () => void;
  onClickCloseButton?: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { isOpen, confirmText, yesButtonText, noButtonText } = props;
  const { onClose } = useDisclosure();

  const onClickYesButton = () => {
    props.onClickYesButton ? props.onClickYesButton() : undefined;
    onClose();
  };

  const onClickNoButton = () => {
    props.onClickNoButton ? props.onClickNoButton() : undefined;
    onClose();
  };

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
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text>{confirmText}</Text>
              <Divider />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                onClickYesButton();
              }}
            >
              {yesButtonText}
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClickNoButton();
              }}
            >
              {noButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
