import { Box, BoxProps, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";


export const MotionBox = motion<BoxProps>(Box)

export const MotionCenter = motion<BoxProps>(Center);
