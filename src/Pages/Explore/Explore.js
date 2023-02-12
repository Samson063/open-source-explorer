import './Explore.scss'
import React, { useState } from 'react'
import { Navbar } from '../../Components'
import RepositoryCard from './RepositoryCard'
import { useEffect } from 'react'
import axios from 'axios'
import { Gi3DGlasses } from 'react-icons/gi'

const Explore = () => {
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const githubURL = 'https://api.github.com/users/samson063/repos'

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(githubURL)
      .then((res) => {
        setIsLoading(false)
        setRepositories(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <>
      <Navbar />
      {isLoading && <p className='loading'>Loading...</p>}
      {!isLoading && (
        <>
          <div className='explore'>
            <h1 className='glass'>
              Explore Repositories
              <i>
                <Gi3DGlasses />
              </i>
            </h1>
          </div>
          <div className='repo-box'>
            {repositories.map((repo) => {
              return (
                <RepositoryCard
                  name={repo.full_name}
                  visibility={repo.private ? 'Private' : 'Public'}
                  language={repo.language}
                  url={repo.html_url}
                  star_count={repo.stargazers_count}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Explore
