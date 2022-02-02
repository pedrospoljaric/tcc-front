/* eslint-disable jsx-a11y/label-has-associated-control */
import Template from 'components/Template'
import { prop } from 'lodash/fp'
import { useEffect, useState } from 'react'
import request from 'utils/request'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import { useRouter } from 'next/dist/client/router'

const Historico = () => {
    const router = useRouter()
    const [file, setFile] = useState(null)

    useEffect(async () => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            await request.post('/records', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            router.push('/matriz')
        }
    }, [file])

    return (
        <Template selected="Histórico">
            <div style={{
                width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 30, marginLeft: 10, marginRight: 10
            }}
            >
                Submeta o arquivo PDF de seu histórico escolar mais atualizado para obter recomendações personalizadas de matriz horária.
            </div>
            {!file
                ? (
                    <DropzoneAreaBase
                        dropzoneText="Arraste um arquivo para cá ou clique para fazer o upload"
                        acceptedFiles={['.pdf']}
                        filesLimit={1}
                        showPreviewsInDropzone={false}
                        onAdd={(files) => { setFile(prop('0.file', files)) }}
                        maxFileSize={30000000}
                    />
                )
                : (
                    <div style={{
                        width: '100%',
                        lineHeight: 10,
                        borderRadius: 10,
                        verticalAlign: 'center',
                        textAlign: 'center',
                        marginTop: 40,
                        backgroundColor: 'lightgray'
                    }}
                    >
                        Carregando arquivo...
                    </div>
                )}
        </Template>
    )
}

export default Historico
