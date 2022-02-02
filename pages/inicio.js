/* eslint-disable jsx-a11y/label-has-associated-control */
import Template from 'components/Template'
import {
    List, ListItem, ListItemText, Typography
} from '@material-ui/core'

const Inicio = () => (
    <Template selected="Início">
        <div style={{
            width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 30, marginLeft: 10, marginRight: 10
        }}
        >
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ textAlign: 'left' }}>
                Tutorial
            </Typography>
            <List>
                <ListItem><ListItemText primary={'1. Aba "Histórico"" no menu para fazer upload do PDF do histórico acadêmico (disponível para download na INTRANET);'} /></ListItem>
                <ListItem><ListItemText primary={'2. Aba "Matriz" para visualizar e configurar matriz horária;'} /></ListItem>
                <ListItem><ListItemText primary={'3. Botão "Preferências" para definições de dias e horários;'} /></ListItem>
                <ListItem><ListItemText primary={'4. Botão "Preencher com recomendações" para visualizar uma grade recomendada do semestre atual;'} /></ListItem>
                <ListItem><ListItemText primary={'5. Botão "Salvar" para armazenar a matriz montada.'} /></ListItem>
            </List>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ textAlign: 'left' }}>
                Observações
            </Typography>
            <List dense>
                <ListItem><ListItemText primary="• Use o navegador Google Chrome ou Microsoft Edge para fazer o download do histórico na INTRANET, históricos baixados pelo Mozilla Firefox apresentaram problemas." /></ListItem>
                <ListItem><ListItemText primary="• O projeto ainda é um protótipo, podendo apresentar alguns problemas e instabilidades, observações sobre isso também são bem-vindas no formulário." /></ListItem>
                <ListItem><ListItemText primary={'• Na aba "Amigos", é possível adicionar amigos usando seus usuários da INTRANET. Amigos adicionados com matrizes salvas afetam um pouco a recomendação.'} /></ListItem>
            </List>
        </div>
    </Template>
)

export default Inicio
