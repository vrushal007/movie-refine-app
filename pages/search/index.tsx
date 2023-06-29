import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { BaseRecord } from "@refinedev/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

interface Movie {
  Title: string;
  imdbID: string;
}

const MoviesList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const apiKey = 'cdc2475f';
        const apiUrl = `http://omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === 'True') {
          const movieResults: Movie[] = data.Search;
          setMovies(movieResults);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
        setMovies([]);
      }

      router.push(`/search?title=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <List>
        <Table dataSource={movies} pagination={false} rowKey="imdbID">
            <Table.Column dataIndex="imdbID" title="Id" />
            <Table.Column dataIndex="Title" title="Title" />
            <Table.Column dataIndex="Year" title="Year" />
            <Table.Column
                title="Action"
                dataIndex=""
                render={(_, record: BaseRecord) => (
                    <Space>
                        <EditButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                        <ShowButton
                            hideText
                            size="small"
                            recordItemId={record.imdbID}
                        />
                        <DeleteButton
                            hideText
                            size="small"
                            recordItemId={record.id}
                        />
                    </Space>
                )}
            />
        </Table>
    </List>
    </div>
  );
};

export default MoviesList;
