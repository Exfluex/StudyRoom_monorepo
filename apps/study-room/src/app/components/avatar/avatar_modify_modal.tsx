import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { AvatarModification_API } from 'apps/study-room/src/app/apis/api_user';
import { AvatarConfiguration } from 'apps/study-room/src/app/data/avatar';
import { useState } from 'react';

export interface AvatarConfigurationModalProps {
  isOpen: boolean; //Redux Manage
}
export function AvatarConfigurationModal({
  isOpen,
}: AvatarConfigurationModalProps) {
  const [avatar, setAvatar] = useState<AvatarConfiguration>({
    topType: 'ShortHairDreads02',
    accessoriesType: 'Blank',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    clotheType: 'BlazerShirt',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Default',
    skinColor: 'DarkBrown',
  });
  const onClose = () => {
    AvatarModification_API(avatar);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
