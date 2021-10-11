/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      description
      status
      dueDate
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        dueDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosDueFirst = /* GraphQL */ `
  query TodosDueFirst(
    $dueDate: AWSDate
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosDueFirst(
      dueDate: $dueDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        status
        dueDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosDueLast = /* GraphQL */ `
  query TodosDueLast(
    $dueDate: AWSDate
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosDueLast(
      dueDate: $dueDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        status
        dueDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosAlphabetically = /* GraphQL */ `
  query TodosAlphabetically(
    $title: String
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosAlphabetically(
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        status
        dueDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
