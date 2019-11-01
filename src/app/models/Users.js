import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";


class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    //Antes de salvar transforma o campo virtual password em password_hash
    //já criptografado
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
  //método que compara a senha do req.body com a do banco
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

}


export default User;
