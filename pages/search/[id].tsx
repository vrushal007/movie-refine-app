import { GetStaticPaths, GetStaticProps } from 'next'
import { Show, TextField, MarkdownField, DateField } from '@refinedev/antd'
import { Image, Typography } from 'antd'
import { IMovieDetail } from 'src/interfaces/movieDetail'
import { Group } from 'antd/es/avatar'
import axios from 'axios'

const { Title } = Typography

interface MovieDetailsProps {
  movie: IMovieDetail
}

const ShowMovie = ({ movie }: MovieDetailsProps) => {
  console.log(movie)
  return (
    <Show>
      <Group>
        <Image alt={movie?.Title} src={movie.Poster} />
        <Group style={{ flexDirection: 'column', margin: '20px' }}>
          <Title level={5}>Id</Title>
          <TextField value={movie.imdbID}></TextField>
          <Title level={5}>Title</Title>
          <TextField value={movie?.Title} />
          <Title level={5}>Content</Title>
          <MarkdownField value={movie?.Plot} />
        </Group>
      </Group>
      <Title level={5}>Category</Title>
      <Title level={5}>Status</Title>
      <TextField value={movie?.Year} />
      <Title level={5}>Created At</Title>
      <DateField value={movie?.Genre} />
    </Show>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params:{
          id:'tt1905041'
        }
      }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<MovieDetailsProps> = async ({
  params
}) => {
  console.log(params)
  const imdbID = params?.id
  const apiKey = 'cdc2475f'
  const apiUrl = `http://omdbapi.com/?apikey=${apiKey}&i=${imdbID}`

  try {
    const response = await axios.get(apiUrl)
    const movie: IMovieDetail = response.data
    return {
      props: {
        movie
      }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}

export default ShowMovie
