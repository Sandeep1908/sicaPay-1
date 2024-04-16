import {useRadio} from "@chakra-ui/react";
import {Box} from "@chakra-ui/react";
import React from "react";

const RadioCard: React.FC<any> = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'primary.600',
                    color: 'white',
                    borderColor: 'primary.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={4}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default RadioCard