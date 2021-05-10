# Library

A web application that allows users to add, delete, and mark 'read' status on their book collections, modeled after library card-catalog systems.

## Features

- Local storage
- Input books to save in collection
- Delete book from collection & local storage
- Toggle read status via checkmark

## Local Storage

User is able to refresh page, close & reopen browser, and close page and return to page, and an array containing their library is saved in their browser's local storage.  Array information is stringified into storage, and then parsed when retrieved.

## Object Constructor

Book items are objects created using a class. Date added is dynanically generated with the Date constructor.

## Credit

Robert Erickson, 2021