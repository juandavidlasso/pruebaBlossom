import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { client } from '@graphql/client'
import { AppRouter } from '@router/AppRouter'

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme='colored'
        pauseOnHover={false}
      />
    </ApolloProvider>
  )
}

export default App
