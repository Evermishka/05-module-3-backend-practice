Области хранения данных:
- база данных на json-server
- BFF
- редакс стор

Сущности приложения:
- пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
- статья: БД (список статей), стор (отображение в браузере)
- комментарии: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

- Пользователи - users: id / login / password / registered_at / role_id
- Роли - roles: id / name
- Статьи - posts: id / title / image_url / content_ / published_at
- Комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF.

- сессия текущего пользователя: login / password / role

Схема для Redux Store (на клиенте):

- user: id / login / roleId / session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt /comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role