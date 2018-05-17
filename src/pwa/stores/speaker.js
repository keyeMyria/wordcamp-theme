import { types, getParent } from 'mobx-state-tree';
import Session from './session';

const Id = types.union(types.number, types.string);

const Speaker = types
  .model('Speaker')
  .props({
    entityId: types.identifier(Id),
    sessions: types.optional(types.array(types.reference(types.late(() => Session))), []),
  })
  .views(self => {
    const getConnection = () => getParent(self, 3).connection;
    return {
      get entity() {
        return getConnection().entity('wcb_speaker', self.entityId);
      },
      get name() {
        return self.entity.title;
      },
      get link() {
        return self.entity.link;
      },
    };
  })
  .actions(self => ({
    addSession(session) {
      if (!self.sessions.includes(session)) self.sessions.push(session);
    },
  }));

export default Speaker;
