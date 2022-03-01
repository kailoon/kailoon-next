import useSWR from 'swr'
import {
  getAuthorDetails,
  getLatestTwoProjects,
  getPages,
  getPosts,
  getProjects,
} from './queries'

export const usePages = () => {
  const { data, error } = useSWR(getPages)
  return {
    pages: data,
    error,
    isLoading: !data && !error,
  }
}

export const useAuthor = () => {
  const { data, error } = useSWR(getAuthorDetails)
  return {
    author: data,
    error,
    isLoading: !data && !error,
  }
}

export const useLatestProjects = () => {
  const { data, error } = useSWR(getLatestTwoProjects)
  return {
    projects: data,
    error,
    isLoading: !data && !error,
  }
}

export const useProjects = () => {
  const { data, error } = useSWR(getProjects)
  return {
    projects: data,
    error,
    isLoading: !data && !error,
  }
}

export const usePosts = () => {
  const { data, error } = useSWR(getPosts)
  return {
    posts: data,
    error,
    isLoading: !data && !error,
  }
}
