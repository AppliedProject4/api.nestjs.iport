import { ProjectEntity } from 'src/typeorm/entities/project.entity'

export class BasicProjectProxy {
    id: string
    image: string
    title: string
    startDate: Date
    endDate: Date
    description: string

    constructor(entity: ProjectEntity) {
        this.id = entity.id
        this.title = entity.title
        this.startDate = entity.startDate
        this.endDate = entity.endDate
        this.description = entity.description
        this.image = entity.image
    }
}