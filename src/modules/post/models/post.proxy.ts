import { PostEntity } from "src/typeorm/entities/post.entity"
import { RegisterProxy } from "src/modules/auth/models/register.proxy"

export class PostProxy {
    id: string
    image: string
    title: string
    description: string
    category: string
    recomendation: number
    contact: string
    salary: number
    post: string
    local: string
    requirements: string
    experienceLevel: string
    vacancyDescription: string
    createAt: Date
    user: RegisterProxy

    constructor(entity: PostEntity) {
        this.id = entity.id
        this.image = entity.image
        this.title = entity.title
        this.description = entity.description
        this.category = entity.category
        this.recomendation = entity.recomendation
        this.contact = entity.contact
        this.salary = entity.salary
        this.post = entity.post
        this.local = entity.local
        this.requirements = entity.requirements
        this.experienceLevel = entity.experienceLevel
        this.vacancyDescription = entity.vacancyDescription
        this.createAt = entity.createAt
        this.user = entity.user
    }
}
