import * as Yup from 'yup';
import Student from '../models/Students';


class StudentController {

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    //função para verificar se existe estudante com email cadastrado
    const studentExists = await Student.findOne({
      where: { email: req.body.email }
    });

    //se existir da erro 400
    if (studentExists) {
      return res.status(400).json({
        error: 'Email do estudante já cadastrado.'
      })
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }



  async update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Estudante Inexistente!' });
    }

    //pegando parametro da rota
    const { id } = req.params;

    //validação de campos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    //carregando dados do estudante do parametro da rota
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Estudante inexistente!' });
    }

    const { name, email, age, weight, height } = req.body;
    //Não deixa atualizar por conta do email
    //tem que ajeitar a função para identificar o email do estudante 
    //... tem que rever
    if (email !== student.email) {
      const studentEmail = await Student.findOne({
        // where: { email, id: { [Op.not]: student.id } },
        where: { email },
      });
      if (studentEmail) {
        return res.status(400).json({
          error: 'Esse email já é utilizado por outro estudante!',
        });
      }

      await student.update(req.body);

      return res.json({
        id,
        name,
        email,
        age,
        weight,
        height,
      });
    }
  }

}

export default new StudentController();