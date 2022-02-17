import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [songID, setSongID] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [row, setRow] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);

  const fetchData = () => {
    fetch(`http://localhost:4000/songs/all`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const deleteSong = (id) => {
      fetch(`http://localhost:4000/songs/deleteSong/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Song was deleted");
          fetchData();
        });
    };
    const songsArr = songs.map((song) => {
      return (
        <tr key={song._id}>
          <td>{song.title}</td>
          <td>{song.artist}</td>
          <td>{song.lyrics}</td>
          <td>{song.addedOn}</td>
          <td>
            <Button
              className="btn"
              size="sm"
              onClick={() => openEdit(song._id)}
            >
              Update
            </Button>
            <Button
              className="btn"
              size="sm"
              onClick={() => deleteSong(song._id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    setRow(songsArr);
  }, [songs]);

  const addSong = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/songs/newSong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
        lyrics: lyrics,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          fetchData();
          setTitle("");
          setArtist("");
          setLyrics("");
          closeAdd();
        } else {
          fetchData();
        }
      });
  };

  const openEdit = (id) => {
    fetch(`http://localhost:4000/songs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSongID(data._id);
        setTitle(data.title);
        setArtist(data.artist);
        setLyrics(data.lyrics);
      });
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setTitle("");
    setArtist("");
    setLyrics("");
  };

  const updateSong = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:4000/songs/updateSong/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
        lyrics: lyrics,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
        closeEdit();
      });
  };

  return (
    <Container>
      <div className="App">
        <div className="text-center my-4">
          <h1>Song List</h1>
          <div className="d-flex justify-content-center">
            <button className="btn" onClick={openAdd}>
              Add Song
            </button>
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Lyrics</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </Table>

        <Modal className="modal" show={showAdd} onHide={closeAdd}>
          <Form onSubmit={(e) => addSong(e)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="songTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="songArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="songLyrics">
                <Form.Label>Lyrics</Form.Label>
                <Form.Control
                  type="text"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn" onClick={closeAdd}>
                Close
              </Button>
              <Button className="btn" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal className="modal" show={showEdit} onHide={closeEdit}>
          <Form onSubmit={(e) => updateSong(e, songID)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="artist">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="lyrics">
                <Form.Label>Lyrics</Form.Label>
                <Form.Control
                  type="text"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn" onClick={closeEdit}>
                Close
              </Button>
              <Button className="btn" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </Container>
  );
}

export default App;
