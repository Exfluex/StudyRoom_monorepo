import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useToggle } from "../../hooks/useToggle";




export function ConfigurationModal(){
  const {isOpen,onOpen,onClose} = useToggle();
  return <Modal
  isOpen={isOpen}
  onClose={onClose}
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Create your account</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <Box>123</Box>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
}
