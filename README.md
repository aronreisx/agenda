<div align="center">
    <img width="500" alt="Logo Agenda" src="https://github.com/aronreisx/projects/blob/master/agenda/logo.svg" />
    <h3>An application to save all your contacts securely 📘</h3>
</div>

<p align="center">
   <a href="https://www.linkedin.com/in/aronreis/">
      <img alt="Aron Reis" src="https://img.shields.io/badge/-AronReis-0A66C2?style=flat&logo=Linkedin&logoColor=white" />
   </a>

  <img alt="Languages" src="https://img.shields.io/github/languages/count/aronreisx/agenda?color=%4d0000">

  <img alt="Repo size" src="https://img.shields.io/github/repo-size/aronreisx/agenda?color=orange">

  <a href="https://github.com/aronreisx/README-agenda/commits/master">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/aronreisx/agenda?color=ff69b4">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-8622f8">
   <a href="https://github.com/aronreisx/agenda/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/aronreisx/agenda?style=social">
  </a>

</p>


<p align="center">
  <a href="#-technologies">🚀 Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">📃 Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-execute">💻 How to execute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">📝 License</a>
</p>
<br>


## 🚀 Technologies

This project was developed using the following technologies:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [MongoDB](https://www.mongodb.com/)

## 📃 Project

This project is a simple CRUD application to save and manage contacts information. It uses containerization as infrastructure to provide backend and database, so there's no need to install any other technology than Docker locally.

## 💻 How to execute

### Requirements

To follow the process bellow you must have [Git](https://git-scm.com) and [Docker](https://www.docker.com/) installed.
Git isn't essential to start the application, in case you haven't it installed you can just download the repository through browser and execute the last setup step bellow inside the app folder.

### Setting up the application

```bash
# Clone the repository
$ git clone https://github.com/aronreisx/agenda.git
```

```bash
# Access the project folder through the terminal
$ cd agenda
```

```bash
# Start the application
$ docker-compose up
```

### Accessing the application

> The server will start at port **`3333`** - now you're abble to access the application at **`http://localhost:3333`**.<br>
> You can change port number through **`.env`** file by setting variable **`SERVER_PORT`**

## 📝 License

This repository are under **MIT LICENSE**. For detailed informations, read the file [LICENSE](LICENSE.md). 

---
<h4 align="center">Final Considerations</h4>
<p align="center">If you find any issue, please go to <a href="https://github.com/aronreisx/agenda/issues">Issue section</a> and open a new issue describing what happened.</p>
<p align="center">If you have anything to contribute with this project, you're free to make a <a href="https://github.com/aronreisx/agenda/pulls">Pull resquest</a>. I'll be very Happy!</p>
<br>
<p align="center">Made with ♥ by <a href="https://www.linkedin.com/in/aronreis/">Aron Reis</a></p>
