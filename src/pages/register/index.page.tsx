import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react"
import { Container, Form, FormError, Header } from "./styles"
import { ArrowRight } from "phosphor-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useEffect } from "react"

const registerFormSchema = z.object({
    username: z.string()
    .min(3)
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuario pode ter somente letras e hifens.'})
    .transform((username) => username.toLowerCase()),
    name: z.string().min(3, { message: 'O usuario precisa ter pelo menos tres letras.' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register(){
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }} = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    useEffect(() => {
        if (router.query.username){
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterFormData){
        console.log(data)
    }

    return(
        <Container>
            <Header>
                <Heading as="strong">
                    Bem vindo ao ignite call!
                </Heading>
                <Text>
                    Precisamos de algumas informções para crair seu perfil! Ah, 
                    voce pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de ususario</Text>
                    <TextInput prefix="ignite.com/" placeholder="seu usuario" {...register('username')} />

                    {errors.username && (
                        <FormError size="sm">{errors.username.message}</FormError>
                    )}

                </label>

                <label>
                    <Text size="sm">Nome Completo</Text>
                    <TextInput placeholder="Seu nome" {...register('name')} />

                    {errors.name && (
                        <FormError size="sm">{errors.name.message}</FormError>
                    )}

                </label>

                <Button type="submit" disabled={isSubmitting}>
                    Proximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}